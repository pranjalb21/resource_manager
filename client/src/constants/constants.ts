export const baseUrl: string = "http://localhost:3000/api/v1";
// export const baseUrl: string = "https://resource-manager-beta.vercel.app/api/v1";
export const calculateCapacity = (
    allEngineers: any[],
    engineer: any,
    tasks: any[]
) => {
    const userTasks = tasks.filter((task) => task.engineer._id == engineer._id);
    const userUsedCapacity = userTasks.reduce(
        (acc, curr) => acc + curr.allocationPercentage,
        0
    );

    return {
        capacity: userUsedCapacity,
    };
};
