<template>
  <div class="q-gutter-sm row items-center no-wrap q-electron-drag--exception">
    <q-btn round flat>
      <q-menu>
        <div class="row no-wrap q-pa-md">
          <div class="column items-center">
            <q-avatar size="72px">
              <img :src="imageUrl" />
            </q-avatar>

            <div class="text-subtitle1 q-mt-md q-mb-xs">
              {{ $store.state.currentUser.nick }}
            </div>

            <q-btn
              color="primary"
              label="Logout"
              size="sm"
              v-close-popup
              @click="logout"
            />
          </div>
        </div>
      </q-menu>
      <q-avatar size="26px">
        <img :src="imageUrl" />
      </q-avatar>
      <q-tooltip>账号</q-tooltip>
    </q-btn>
  </div>
</template>

<script>
import { getImageUrl } from "src/utils/image";
export default {
  name: "ToolbarItemRight",
  data() {
    return {
      search: "",
      mobileData: false,
      bluetooth: true,
      isMaximize: true,
      imageUrl: ""
    };
  },
  methods: {
    fullScreen() {
      if (this.$q.fullscreen.isActive) {
        // 退出全屏模式：
        this.$q.fullscreen
          .exit()
          .then(() => {
            // v1.5.0+
            // success!
          })
          // eslint-disable-next-line handle-callback-err
          .catch(err => {
            // v1.5.0+
            // oh, no!!!
          });
      } else {
        // 请求全屏模式：
        this.$q.fullscreen
          .request()
          .then(() => {
            // v1.5.0+
            // success!
          })
          // eslint-disable-next-line handle-callback-err
          .catch(err => {
            // v1.5.0+
            // oh, no!!!
          });
      }
    },

    logout() {
      this.$router.push("/");
      this.$store.commit("LOGOUT");
      window.sessionStorage.clear();
    },

    // electron
    minimize() {
      if (process.env.MODE === "electron") {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize();
      }
    },

    maximize() {
      if (process.env.MODE === "electron") {
        const win = this.$q.electron.remote.BrowserWindow.getFocusedWindow();
        if (win.isMaximized()) {
          win.unmaximize();
          this.isMaximize = !this.isMaximize;
        } else {
          win.maximize();
          this.isMaximize = !this.isMaximize;
        }
      }
    },

    closeApp() {
      if (process.env.MODE === "electron") {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().close();
      }
    }
  },
  async created() {
    this.imageUrl = await getImageUrl(this.$store.state.currentUser.avatar);
  }
};
</script>
