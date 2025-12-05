import { TorboxApi } from "@torbox/torbox-api";

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
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching up status:', error);
      throw error;
    }
  }

  public async fetchUserData() {
    try {
      const { data } = await this.torboxApi.user.getUserData('v1');
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }
}

export default TorboxAPI;