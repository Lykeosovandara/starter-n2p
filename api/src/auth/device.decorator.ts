import { SetMetadata } from '@nestjs/common';

export const DEVICE_KEY = 'Device_Key';
export const IgnoreDevice = () => SetMetadata(DEVICE_KEY, true);
