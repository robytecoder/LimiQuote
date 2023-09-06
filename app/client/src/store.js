import { ref } from "vue";

const currentUser = ref(null);

function setCurrentUser(user) {
  currentUser.value = user;
}

async function updateAuthState() {
  const res = await fetch("/api/social/whoami");
  if (res.ok) {
    setCurrentUser((await res.json()).data);
  } else {
    setCurrentUser(null);
  }
}

export { currentUser, setCurrentUser, updateAuthState };
