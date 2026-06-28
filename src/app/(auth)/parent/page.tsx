const parents = [
  { name: "Robert Chen", email: "robert.chen@email.com", students: 2, phone: "+1 555-0201" },
  { name: "Maria Garcia", email: "maria.g@email.com", students: 1, phone: "+1 555-0202" },
  { name: "David Kim", email: "david.kim@email.com", students: 3, phone: "+1 555-0203" },
  { name: "Lisa Thompson", email: "lisa.t@email.com", students: 1, phone: "+1 555-0204" },
  { name: "James Wilson", email: "j.wilson@email.com", students: 2, phone: "+1 555-0205" },
  { name: "Emily Davis", email: "emily.d@email.com", students: 1, phone: "+1 555-0206" },
]

export default function ParentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="t-h1">Parents</h1>
          <p className="t-body text-base-content/50 mt-1">Manage parent accounts and communication</p>
        </div>
        <button className="btn btn-primary">Add Parent</button>
      </div>

      <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100 shadow-card">
        <table className="table hover:table-zebra">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Students</th>
            </tr>
          </thead>
          <tbody>
            {parents.map((parent, i) => (
              <tr key={i}>
                <td className="font-medium">{parent.name}</td>
                <td className="text-base-content/60">{parent.email}</td>
                <td className="text-base-content/60">{parent.phone}</td>
                <td>
                  <span className="badge badge-sm badge-ghost">{parent.students}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
