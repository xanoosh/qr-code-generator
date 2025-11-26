import QrForm from './components/QrForm';
import QrDialog from './components/QrDialog';

function App() {
  return (
    <main className="h-screen flex flex-col gap-4 justify-center items-center bg-slate-900 p-4">
      <QrForm />
      <QrDialog />
    </main>
  );
}

export default App;
