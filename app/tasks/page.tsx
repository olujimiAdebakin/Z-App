export default async function TasksPage() {
    const response = await fetch("http://localhost:3000/api/tasks", {
      cache: "no-store",
    });
    const tasks = await response.json();

    console.log("tasks:", tasks);
    return (
        <>
            <h1>Tasks</h1>
        </>
    )
}