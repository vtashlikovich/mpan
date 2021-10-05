var MPAN = require('./module/index').MPAN;

const validMpan = new MPAN('011238001700053058802');
const inValidMpan = new MPAN('121212');
const shortMpan = new MPAN('1000071051506');

test('Valid Mpan', () => {
    expect(validMpan.isValid).toBe(true);
    expect(inValidMpan.isValid).toBe(false);
    expect(shortMpan.isValid).toBe(true);
  });

test('Short Mpan', () => {
    expect(validMpan.isShort).toBe(false);
    expect(validMpan.shortString).toBe('1700053058802');
    expect(inValidMpan.isShort).toBe(false);
    expect(shortMpan.isShort).toBe(true);
    expect(shortMpan.shortString).toBe('1000071051506');
  });

test('LLF', () => {
    expect(validMpan.llf).toBe('800');
    expect(inValidMpan.llf).toBe('');
    expect(shortMpan.llf).toBe('');
  });

test('Distributor code', () => {
    expect(validMpan.distributorCode).toBe('17');
    expect(inValidMpan.distributorCode).toBe('');
    expect(shortMpan.distributorCode).toBe('10');
  });

test('Profile', () => {
    expect(validMpan.profile).toBe('01');
    expect(inValidMpan.profile).toBe('');
    expect(shortMpan.profile).toBe('');
  });

  
  
  