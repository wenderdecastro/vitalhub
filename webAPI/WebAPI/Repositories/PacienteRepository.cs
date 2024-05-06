﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Contexts;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Utils;
using WebAPI.ViewModels;

namespace WebAPI.Repositories
{
    public class PacienteRepository : IPacienteRepository
    {
        VitalContext ctx = new VitalContext();

        public Paciente AtualizarPerfil(Guid Id, PacienteViewModel paciente)
        {
            Paciente pacienteBuscado = ctx.Pacientes.Include(x => x.Endereco).FirstOrDefault(x => x.Id == Id);

            if (paciente.DataNascimento != null)
                pacienteBuscado.DataNascimento = paciente.DataNascimento;

            if (paciente.Senha != null)
                pacienteBuscado.IdNavigation.Senha = paciente.Senha;

            if (paciente.Cpf != null)
                pacienteBuscado.Cpf = paciente.Cpf;

            if (paciente.Cep != null)
                pacienteBuscado.Endereco.Cep = paciente.Cep;

            if (paciente.Logradouro != null)
                pacienteBuscado.Endereco.Logradouro = paciente.Logradouro;

            if (paciente.Numero != null)
                pacienteBuscado.Endereco.Numero = paciente.Numero;

            if (paciente.Cidade != null)
                pacienteBuscado.Endereco.Cidade = paciente.Cidade;

            ctx.Pacientes.Update(pacienteBuscado);
            ctx.Enderecos.Update(pacienteBuscado.Endereco);
            ctx.SaveChanges();

            return pacienteBuscado;
        }


        public List<Consulta> BuscarPorData(DateTime dataConsulta, Guid idPaciente)
        {
            return ctx.Consultas
                   .Include(x => x.Situacao)
                     .Include(x => x.Prioridade)
                     .Include(x => x.MedicoClinica)
                     .Include(x => x.MedicoClinica.Medico.IdNavigation)
                     .Include(x => x.Paciente!.IdNavigation)
                     .Include(x => x.MedicoClinica.Medico.Especialidade)
                     .Include(x => x.Receita)
                 .Where(x => x.PacienteId == idPaciente && EF.Functions.DateDiffDay(x.DataConsulta, dataConsulta) == 0)
                 .ToList();
        }


        public Paciente BuscarPorId(Guid Id)
        {
            try
            {
                return ctx.Pacientes
                .Include(x => x.IdNavigation)
                .Include(x => x.Endereco)
                .FirstOrDefault(x => x.Id == Id)!;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Cadastrar(Usuario user)
        {
            try
            {
                user.Senha = Criptografia.GerarHash(user.Senha!);
                ctx.Usuarios.Add(user);
                ctx.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }






    }
}
