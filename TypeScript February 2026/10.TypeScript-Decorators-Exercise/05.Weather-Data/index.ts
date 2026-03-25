function cacheWeatherData() {
    let cached: string[] = [];
    let lastCached: Date = new Date();

    return function (target: Object, key: string, descriptor: PropertyDescriptor) {
        const original = descriptor.value;

        descriptor.value = function () {
            const result = original.call(this);

            if (cached.length === 0) {
                cached = [...result];
                lastCached = new Date();
            }
            else {
                const currentDate = new Date();
                const difference = currentDate.getSeconds() - lastCached.getSeconds();

                if (difference < 5) {
                    console.log('Returned from cache');
                }
                else {
                    cached = [...result];
                    lastCached = new Date();
                }
            }

            return cached;
        }
    }
}

class MockWeatherDataService {
    private weatherData: string[] = [
        'Sunny 8° to 20°',
        'Partially Cloudy 7° to 19°',
        'Sunny 5° to 18°'
    ];

    addWeatherData(data: string) {
        this.weatherData.push(data);
    }

    @cacheWeatherData()
    getWeatherData() {
        return this.weatherData;
    }
}

let service = new MockWeatherDataService();
console.log(service.getWeatherData());
console.log(service.getWeatherData());
service.addWeatherData('Partially Cloudy 5° to 11°');
console.log(service.getWeatherData());
setTimeout(() => console.log(service.getWeatherData()), 7000);