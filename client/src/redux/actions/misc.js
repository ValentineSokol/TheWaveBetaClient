import { createAction } from '@reduxjs/toolkit';

const queryParamsChanged = createAction('queryParamsChanged', (queryParams) => ({ payload: queryParams }));
export default queryParamsChanged;
