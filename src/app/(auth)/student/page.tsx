import { StatusBadge } from "@/components/status-badge"

const students = [
  { name: "Alice Chen", grade: "5th", bus: "Bus #12", parent: "Robert Chen", status: "active" },
  { name: "Ben Chen", grade: "3rd", bus: "Bus #12", parent: "Robert Chen", status: "active" },
  { name: "Sofia Garcia", grade: "2nd", bus: "Bus #08", parent: "Maria Garcia", status: "active" },
  { name: "Ethan Kim", grade: "6th", bus: "Bus #15", parent: "David Kim", status: "active" },
  { name: "Luna Kim", grade: "4th", bus: "Bus #15", parent: "David Kim", status: "inactive" },
  { name: "Noah Thompson", grade: "1st", bus: "Bus #03", parent: "Lisa Thompson", status: "active" },
]

export default function StudentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="t-h1">Students</h1>
          <p className="t-body text-base-content/50 mt-1">View and manage student records</p>
        </div>
        <button className="btn btn-primary">Add Student</button>
      </div>

      <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100 shadow-card">
        <table className="table hover:table-zebra">
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
            {students.map((student, i) => (
              <tr key={i}>
                <td className="font-medium">{student.name}</td>
                <td className="text-base-content/60">{student.grade}</td>
                <td className="text-base-content/60">{student.bus}</td>
                <td className="text-base-content/60">{student.parent}</td>
                <td>
                  <StatusBadge status={student.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
