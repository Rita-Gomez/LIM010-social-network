/* eslint-disable no-undef */
/* eslint-disable import/no-self-import */
global.window = global;
require('../src/data.js');
require('./data.spec.js');

describe('validarPassword', () => {
  it('debería retornar si la contraseña es mayor a 6 digitos', () => {
    expect(data.validarPassword('123456')).toEqual(true);
  });
  it('debería retornar si la contraseña es menor a 6 digitos', () => {
    expect(data.validarPassword('123')).toEqual(false);
  });
});

describe('validarEmail', () => {
  it('debería retornar si el email es válido', () => {
    expect(data.validarEmail('ams_t2@hotmail.com')).toEqual(true);
  });
  it('debería retornar si el email es inválido', () => {
    expect(data.validarEmail('ams_t2.hotmail.com')).toEqual(false);
  });
});

describe('validarNombre', () => {
  it('debería retornar true si el nombre es válido', () => {
    expect(data.validarNombre('andrea')).toEqual(true);
  });
  it('debería retornar false si el nombre es inválido', () => {
    expect(data.validarNombre(1234)).toEqual(false);
  });
});

const post = [{ area: 'post1' }, { area: 'post2' }, { area: 'post3' }];

describe('eliminarElementoArray', () => {
  it('debería retornar [{"area":"post2"}]', () => {
    expect(data.eliminarElementoArray(post, 1)).toEqual([{ area: 'post1' }, { area: 'post3' }]);
  });
});

describe('agregarElementoArray', () => {
  it('debería retornar [{"area":"post4"}]', () => {
    expect(data.agregarElementoArray({ area: 'post4' }, post)).toEqual([{ area: 'post1' }, { area: 'post2' }, { area: 'post3' }, { area: 'post4' }]);
  });
});
