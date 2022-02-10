import { SortPatientNamePipe } from './sort-patient-name.pipe';

describe('SortPatientNamePipe', () => {
  it('create an instance', () => {
    const pipe = new SortPatientNamePipe();
    expect(pipe).toBeTruthy();
  });
});
