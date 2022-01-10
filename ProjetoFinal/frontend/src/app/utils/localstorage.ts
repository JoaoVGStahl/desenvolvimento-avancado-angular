export class LocalStorageUtils {
    
    public obterUsuario() {
        return JSON.parse(localStorage.getItem('pontosys.user'));
    }

    public salvarDadosLocaisUsuario(response: any) {
        this.salvarTokenUsuario(response.acessToken);
        this.salvarUsuario(response.userToken);
    }

    public limparDadosLocaisUsuario() {
        localStorage.removeItem('pontosys.token');
        localStorage.removeItem('pontosys.user');
    }

    public obterTokenUsuario(): string {
        return localStorage.getItem('pontosys.token');
    }

    public salvarTokenUsuario(token: string) {
        localStorage.setItem('pontosys.token', token);
    }

    public salvarUsuario(user: string) {
        localStorage.setItem('pontosys.user', JSON.stringify(user));
    }

}