export default function Dashboard({ user }) {
      return (
        <div className="min-h-screen bg-gray-100 p-8">
          <h1 className="text-3xl font-bold text-primary mb-8">Dashboard</h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Informações do Usuário</h2>
            <p>Bem-vindo, {user?.name}</p>
            {/* Add more dashboard content here */}
          </div>
        </div>
      );
    }
