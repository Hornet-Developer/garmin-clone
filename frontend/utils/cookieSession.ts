const setCookieSession = ({ name, value, expiresIn }: { name: string; value: string, expiresIn?: string }) => {
  fetch("/api/set-cookie-session", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, value, expiresIn }),
  })
}

const removeCookieSession = (name: string) => {
  fetch("/api/remove-cookie-session", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
};


export { setCookieSession, removeCookieSession }