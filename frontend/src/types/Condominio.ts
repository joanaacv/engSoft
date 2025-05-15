export interface Condominio {
  id: number;
  nome: string;
  endereco: string;
  telefone: string;
  email: string;
  data_cadastro: string;
  data_atualizacao: string;
  locadores: number[];
  vagas: number[];
  locacoes: number[];
  locatarios: number[];
  alugueis: number[];
  anuncios: number[];
  anuncios_vagas: number[];
}
