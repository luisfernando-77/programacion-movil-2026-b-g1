
import { afterEach, describe, expect, it } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import AttendanceListPage from '../AttendanceListPage';

afterEach(() => {
  cleanup();
  window.history.replaceState({}, '', '/');
});

describe('AttendanceListPage', () => {
  it('shows an error message and retries loading', async () => {
    window.history.replaceState({}, '', '/attendance?mode=error');

    render(<AttendanceListPage />);

    expect(
      await screen.findByText('Could not load attendance records.')
    ).toBeTruthy();

    const retryButton = screen.getByText('Retry');
    expect(retryButton).toBeTruthy();

    fireEvent.click(retryButton);

    await waitFor(() => {
      expect(
        screen.getByLabelText('Loading attendance')
      ).toBeTruthy();
    });
  });
});
