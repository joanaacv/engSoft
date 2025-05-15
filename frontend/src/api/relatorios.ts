import api from "./index";

export interface Relatorio {
  id: number;
  locacao: number;
  data_geracao: string;
  conteudo: string;
}

export const getRelatorios = async (): Promise<Relatorio[]> => {
  const response = await api.get("relatorios/");
  return response.data;
};

export const getRelatoriosCondominio = async (
  condominioId: number
): Promise<Relatorio[]> => {
  const response = await api.get(`relatorios/?condominio=${condominioId}`);
  return response.data;
};

export const getRelatorio = async (id: number): Promise<Relatorio> => {
  const response = await api.get(`relatorios/${id}/`);
  return response.data;
};

export const generateRelatorio = async (
  locacaoId: number
): Promise<Relatorio> => {
  const response = await api.post(`relatorios/gerar/`, {
    locacao_id: locacaoId,
  });
  return response.data;
};
