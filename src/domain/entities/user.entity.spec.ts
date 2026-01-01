import { describe, it, expect } from 'vitest';
import { User } from './user.entity';
import { randomUUID } from 'node:crypto';

describe('User Entity (Unit)', () => {
  it('should create a user entity with correct props', () => {
    const createdAt = new Date();

    const user = new User({
      id: randomUUID(),
      createdAt,
      email: 'test@email.com',
      name: 'test',
      password: '12345',
    });

    expect(user.id).toBeDefined();
    expect(user.email).toBe('test@email.com');
    expect(user.name).toBe('test');
    expect(user.createdAt).toBe(createdAt);
  });

  it('should change password', () => {
    const user = new User({
      id: randomUUID(),
      createdAt: new Date(),
      email: 'test@email.com',
      name: 'test',
      password: '12345',
    });

    user.changePassword('change-password');

    expect(user.getPassword()).toBe('change-password');
  });

  it('should validate change password', () => {
    const user = new User({
      id: randomUUID(),
      createdAt: new Date(),
      email: 'test@email.com',
      name: 'test',
      password: '12345',
    });

    expect(() => {
      user.changePassword('123');
    }).toThrow('Senha Fraca');
  });

  it('should change name', () => {
    const user = new User({
      id: randomUUID(),
      createdAt: new Date(),
      email: 'test@email.com',
      name: 'test',
      password: '12345',
    });

    user.changeName('teste1');

    expect(user.name).toBe('teste1');
  });

  
  it('should validate change name', () => {
    const user = new User({
      id: randomUUID(),
      createdAt: new Date(),
      email: 'test@email.com',
      name: 'test',
      password: '12345',
    });

    expect(()=>{
      user.changeName('12');
    }).toThrow('Nome inválido');
  });

  it('should serialize without exposing password (toJSON)', () => {
    const user = new User({
      id: randomUUID(),
      createdAt: new Date(),
      email: 'test@email.com',
      name: 'test',
      password: '12345',
    });

    const json = user.toJSON();

    expect(json).toEqual({
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    });

    expect(json).not.toHaveProperty('password');
  });

  it('should return safe public response (toResponse)', () => {
    const user = new User({
      id: randomUUID(),
      createdAt: new Date(),
      email: 'test@email.com',
      name: 'test',
      password: '12345',
    });

    const response = user.toResponse();

    expect(response).toEqual({
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    });
  });
});
