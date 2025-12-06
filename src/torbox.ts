import { CreateWebDownloadRequest, TorboxApi } from "@torbox/torbox-api";

class TorboxAPI {
  private torboxApi: TorboxApi;

  constructor(token: string) {
    this.torboxApi = new TorboxApi({
      token,
      baseUrl: "https://api.torbox.app",
    });
  }

  public async fetchUpStatus() {
    try {
      const { data } = await this.torboxApi.general.getUpStatus();
      return data;
    } catch (error) {
      console.error('Error fetching up status:', error);
      throw Error('Failed to fetch up status from Torbox');
    }
  }

  public async fetchUserData() {
    try {
      const { data } = await this.torboxApi.user.getUserData('v1');
      return data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw Error('Failed to fetch user details from Torbox');
    }
  }

  public async createWebDownload(url: string) {
    const createWebDownloadRequest: CreateWebDownloadRequest = {
      link: url,
    };

    try {
      const { data } = await this.torboxApi.webDownloadsDebrid.createWebDownload('v1', createWebDownloadRequest);
      return data;
    } catch (error) {
      console.error('Error creating web download:', error);
      throw Error('Failed to create web download for Torbox');
    }
  }
}

export default TorboxAPI;