export default function StudentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Students</h1>
          <p className="mt-1 text-sm text-base-content/60">View and manage student records</p>
        </div>
        <button className="btn btn-primary btn-sm">Add Student</button>
      </div>

      <div className="overflow-x-auto rounded-box border border-base-300">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Grade</th>
              <th>Bus</th>
              <th>Parent</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "Alice Chen", grade: "5th", bus: "Bus #12", parent: "Robert Chen", status: "Active" },
              { name: "Ben Chen", grade: "3rd", bus: "Bus #12", parent: "Robert Chen", status: "Active" },
              { name: "Sofia Garcia", grade: "2nd", bus: "Bus #08", parent: "Maria Garcia", status: "Active" },
              { name: "Ethan Kim", grade: "6th", bus: "Bus #15", parent: "David Kim", status: "Active" },
              { name: "Luna Kim", grade: "4th", bus: "Bus #15", parent: "David Kim", status: "Inactive" },
              { name: "Noah Thompson", grade: "1st", bus: "Bus #03", parent: "Lisa Thompson", status: "Active" },
            ].map((student, i) => (
              <tr key={i}>
                <td className="font-medium">{student.name}</td>
                <td className="text-base-content/70">{student.grade}</td>
                <td className="text-base-content/70">{student.bus}</td>
                <td className="text-base-content/70">{student.parent}</td>
                <td>
                  <span
                    className={`badge badge-sm ${
                      student.status === "Active" ? "badge-success" : "badge-ghost"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
