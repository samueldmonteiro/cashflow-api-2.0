
export interface UserProps {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
}

export class User {
  private props: UserProps;

  constructor(props: UserProps) {
    this.props = { ...props };
  }

  get id(): string {
    return this.props.id;
  }

  get email(): string {
    return this.props.email;
  }

  get name(): string {
    return this.props.name;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  // Relacionamentos (podem ser undefined se não carregados)
  /**get posts(): Post[] | undefined {
    return this.props.posts;
  }**/

  getPassword(): string {
    return this.props.password;
  }

  changePassword(newPassword: string): void {
    if (newPassword.length < 5) {
      throw new Error('Senha Fraca');
    }
    this.props.password = newPassword;
  }

  changeName(newName: string): void {
    if (!newName || newName.trim().length < 3) {
      throw new Error('Nome inválido');
    }

    this.props.name = newName.trim();
  }

  // Serialização SEGURA - sem campos sensíveis
  toJSON(): Record<string, any> {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      createdAt: this.createdAt,
      // Relacionamentos são incluídos se existirem
      //...(this.posts && { posts: this.posts.map(p => p.toJSON()) }),
    };
  }

  // Serialização para resposta pública (ainda mais restrito)
  toResponse(): Record<string, any> {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      createdAt: this.createdAt,
    };
  }
}