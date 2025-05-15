import { createAction } from "@reduxjs/toolkit";

export const setSelectedCampaign = createAction<number>('selectCampaign');
export const setSelectedMap = createAction<number>('selectMap');