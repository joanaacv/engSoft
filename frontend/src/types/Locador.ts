export interface Locador {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  endereco: string;
  data_nascimento: string;
  data_cadastro: string;
  data_atualizacao: string;
  usuario: number;
  condominios: number[];
  vagas: number[];
  locacoes: number[];
  locatarios: number[];
  alugueis: number[];
  anuncios: number[];
  anuncios_vagas: number[];
}
