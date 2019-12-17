import path from 'path';

import { cascade } from '../src';

beforeEach(() => {
  delete process.env.A;
  delete process.env.B;
  delete process.env.C;
  delete process.env.D;
  delete process.env.E;
  delete process.env.EXTERNAL_E;
});

describe('cascade', () => {
  const defaultDotenvFilePath = path.resolve(__dirname, '.env');

  it('in prudction', () => {
    process.env.NODE_ENV = 'production';
    cascade({ path: defaultDotenvFilePath });
    expect(process.env.A).toEqual('default-A');
    expect(process.env.B).toEqual('production-local-B');
    expect(process.env.C).toEqual('production-C');
    expect(process.env.D).toEqual('local-D');
  });

  it('in development', () => {
    process.env.NODE_ENV = 'development';
    process.env.EXTERNAL_E = 'development-local-external-E';
    cascade({ path: defaultDotenvFilePath });
    expect(process.env.A).toEqual('default-A');
    expect(process.env.B).toEqual('default-B');
    expect(process.env.C).toEqual('development-C');
    expect(process.env.D).toEqual('local-D');
    expect(process.env.E).toEqual('development-local-external-E');
  });
});

describe('cascade custom', () => {
  const customDotenvFilePath = path.resolve(__dirname, 'custom/.env');

  it('default', () => {
    console.log(customDotenvFilePath);
    cascade({ path: customDotenvFilePath });
    expect(process.env.A).toEqual('custom-A');
  });
});
