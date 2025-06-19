import api from "./index";

export interface Locacao {
  id: number;
  vaga: number;
  locador: number;
  locatario: number;
  data_inicio: string;
  data_fim: string;
  valor_total: number;
  pago: boolean;
}

export const getLocacoes = async (): Promise<Locacao[]> => {
  const response = await api.get("locacoes/");
  return response.data;
};

export const getLocacao = async (id: number): Promise<Locacao> => {
  const response = await api.get(`locacoes/${id}/`);
  return response.data;
};

export const createLocacao = async (
  data: Omit<Locacao, "id">
): Promise<Locacao> => {
  const response = await api.post("locacoes/", data);
  return response.data;
};

export const payLocacao = async (id: number): Promise<Locacao> => {
  const response = await api.post(`locacoes/${id}/pay/`);
  return response.data;
};

export const getMinhasLocacoes = async (): Promise<Locacao[]> => {
  const response = await api.get("locacoes/minhas/");
  return response.data;
};

export const getLocacoesComoLocador = async (): Promise<Locacao[]> => {
  const response = await api.get("locacoes/como_locador/");
  return response.data;
};
