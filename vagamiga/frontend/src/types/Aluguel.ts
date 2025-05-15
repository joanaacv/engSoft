export interface Aluguel {
  id: number;
  locacao: number;
  data_vencimento: string;
  valor: number;
  status: string; // 'pago' ou 'pendente'
  data_pagamento: string | null; // Pode ser nulo se ainda não foi pago
  data_cadastro: string;
  data_atualizacao: string;
  locatario: number;
  locador: number;
  vaga: number;
  condominios: number[];
  locadores: number[];
}
