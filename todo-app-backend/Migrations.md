### 🛠 Running EF Core Migrations from Infrastructure Project

This guide shows how to add and apply Entity Framework Core migrations when your `DbContext` is located inside the `Todo.Infrastructure` project, and your `Program.cs` (startup) is in `Todo.API`.

---

###  Run following commands

```bash
dotnet tool install --global dotnet-ef

cd src/TodoApp.Infrastructure


dotnet ef migrations add [MigratinName] `
  --project . `
  --startup-project ..\TodoApp.API `
  --output-dir Persistence\Migrations

dotnet ef database update `
  --project . `
  --startup-project ..\TodoApp.API

"email": "testuser2@todo.com",
  "password": "password"