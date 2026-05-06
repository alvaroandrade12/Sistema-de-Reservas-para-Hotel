"use client";

import { useState, useEffect } from "react";
import { Estudiante, estudiantesService } from "@/services";

export default function EstudiantesPage() {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<{ message: string, type: "success" | "error" } | null>(null);

  // Form state
  const [form, setForm] = useState<any>({
    nombres: "",
    apellidos: "",
    codigoEstudiantil: "",
    documentoIdentidad: "",
    correoInstitucional: "",
    fechaNacimiento: "",
    programaAcademicoId: 1,
  });

  const load = async () => {
    setIsLoading(true);
    try {
      const data = await estudiantesService.findAll();
      setEstudiantes(data);
    } catch (error) {
      console.error("Error cargando estudiantes", error);
      notify("Error al cargar la lista de estudiantes", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const notify = (message: string, type: "success" | "error" = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await estudiantesService.create(form as Estudiante);
      notify("Estudiante creado correctamente", "success");
      setShowForm(false);
      setForm({
        nombres: "", apellidos: "", codigoEstudiantil: "",
        documentoIdentidad: "", correoInstitucional: "",
        fechaNacimiento: "", programaAcademicoId: 1,
      });
      await load();
    } catch (error: any) {
      const errorMessage = error.message || "Hubo un error al guardar el estudiante.";
      notify(errorMessage, "error");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 relative overflow-hidden font-sans">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px] pointer-events-none" />

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-6 right-6 px-6 py-3 rounded-lg shadow-2xl z-50 transition-all duration-500 transform translate-y-0 opacity-100 flex items-center space-x-3 backdrop-blur-md border ${notification.type === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
          <span className="text-xl">{notification.type === 'success' ? '✓' : '✕'}</span>
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
              Gestión de Estudiantes
            </h1>
            <p className="text-gray-400">Administra el registro académico de tus estudiantes.</p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-medium shadow-lg shadow-blue-500/20 transition-all active:scale-95 flex items-center space-x-2"
          >
            <span className="text-xl leading-none">+</span>
            <span>Nuevo Estudiante</span>
          </button>
        </header>

        {/* Table Container */}
        <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-gray-300 text-sm uppercase tracking-wider">
                  <th className="p-5 font-semibold">Código</th>
                  <th className="p-5 font-semibold">Estudiante</th>
                  <th className="p-5 font-semibold">Documento</th>
                  <th className="p-5 font-semibold">Correo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="p-10 text-center text-gray-400 animate-pulse">Cargando datos...</td>
                  </tr>
                ) : estudiantes.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-10 text-center text-gray-400">No hay estudiantes registrados.</td>
                  </tr>
                ) : (
                  estudiantes.map((est) => (
                    <tr key={est.id} className="hover:bg-white/5 transition-colors group">
                      <td className="p-5 font-mono text-blue-400">{est.codigoEstudiantil}</td>
                      <td className="p-5">
                        <div className="font-medium text-white group-hover:text-blue-300 transition-colors">
                          {est.nombres} {est.apellidos}
                        </div>
                      </td>
                      <td className="p-5 text-gray-300">{est.documentoIdentidad}</td>
                      <td className="p-5 text-gray-400 text-sm">{est.correoInstitucional}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Form Overlay */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#121212] border border-white/10 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Agregar Nuevo Estudiante</h2>
                <button 
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Nombres</label>
                    <input type="text" name="nombres" value={form.nombres} onChange={handleChange} required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-600 text-white" 
                      placeholder="Ej: Juan" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Apellidos</label>
                    <input type="text" name="apellidos" value={form.apellidos} onChange={handleChange} required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-600 text-white" 
                      placeholder="Ej: Pérez" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Código Estudiantil</label>
                    <input type="text" name="codigoEstudiantil" value={form.codigoEstudiantil} onChange={handleChange} required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-600 text-white" 
                      placeholder="Ej: 20231001" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Documento de Identidad</label>
                    <input type="text" name="documentoIdentidad" value={form.documentoIdentidad} onChange={handleChange} required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-600 text-white" 
                      placeholder="Ej: 123456789" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Correo Institucional</label>
                    <input type="email" name="correoInstitucional" value={form.correoInstitucional} onChange={handleChange} required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-600 text-white" 
                      placeholder="Ej: juan.p@univ.edu" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Fecha de Nacimiento</label>
                    <input type="date" name="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange} required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-gray-300" />
                  </div>
                </div>

                <div className="pt-6 flex justify-end space-x-4 border-t border-white/10">
                  <button type="button" onClick={() => setShowForm(false)}
                    className="px-6 py-3 rounded-xl font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all">
                    Cancelar
                  </button>
                  <button type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-medium shadow-lg shadow-blue-500/20 transition-all active:scale-95">
                    Guardar Estudiante
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}