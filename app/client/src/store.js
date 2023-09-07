import axios from "axios";
import { ref } from "vue";

const currentUser = ref(null);

function setCurrentUser(user) {
  currentUser.value = user;
}

async function updateAuthState() {
  try {
    let res = await axios.get("/api/social/whoami");
    if (res.data) {
      setCurrentUser(res.data.data);
    } else {
      setCurrentUser(null);
    }
  } catch (error) {
    setCurrentUser(null);
  }
}
updateAuthState();

export { currentUser, setCurrentUser, updateAuthState };
