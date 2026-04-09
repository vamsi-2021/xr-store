import NetworkService from './NetworkService';
import DashboardModel from '../models/DashboardModel';

const DASHBOARD_URL = 'https://rkj386iqpa.execute-api.us-east-2.amazonaws.com';

const DashboardService = {
  async getApps(): Promise<DashboardModel[]> {
    const token = NetworkService.getToken();
    const response = await fetch(DASHBOARD_URL, {
      method: 'GET',
      headers: {
        accesstoken: token ?? '',
        Accept: 'application/json',
      },
    });

    let data: any;
    const contentType = response.headers.get('Content-Type') || '';
    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const message: string =
        (data && data.message) ||
        (typeof data === 'string' ? data : null) ||
        `Request failed with status ${response.status}`;
      const error: any = new Error(message);
      error.status = response.status;
      throw error;
    }

    return DashboardModel.fromList(Array.isArray(data) ? data : data.apps ?? []);
  },
};

export default DashboardService;
