function summarizePerson(id: number, firstName: string, lastName: string, age: number, middleName?: string, hobbies?: string[], workInfo?: [string, number]): [number, string, number, string, string] {
    const fullName: string = middleName ? `${firstName} ${middleName} ${lastName}` : `${firstName} ${lastName}`;
    const hobbiesJoined: string = (!hobbies || hobbies[0] === null) ? "-" : hobbies.join(", ");
    const workInfoJoined: string = workInfo ? `${workInfo[0]} -> ${workInfo[1]}` : "-";

    return [id, fullName, age, hobbiesJoined, workInfoJoined];
}

console.log(summarizePerson(12, 'Eliot', 'Des', 20, 'Braylen', ['tennis', 'football', 'hiking'], ['Sales Consultant', 2500]));