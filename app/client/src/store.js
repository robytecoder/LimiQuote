import { ref } from "vue";

const user = ref(null);

function setUser(_user) {
  user.value = _user;
}

async function updateAuthState() {
  fetch("/api/social/whoami").then(async (res) => {
    if (res.ok) {
      setUser(await res.json());
    } else {
      setUser(null);
    }
  });
}

export { user, setUser, updateAuthState };
