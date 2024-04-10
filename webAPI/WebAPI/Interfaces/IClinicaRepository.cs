using System;
using System.Collections.Generic;
using WebAPI.Domains;

namespace WebAPI.Interfaces
{
    public interface IClinicaRepository
    {
        public void Cadastrar(Clinica clinica);

        public List<Clinica> Listar();

        public Clinica BuscarPorId(Guid id);

        public IList<Clinica> ListarPorCidade(string cidade);
    }
}
