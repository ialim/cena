
export const sendEmail = async (data) => {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      let errorMessage = "Message not sent, please try again later";

      try {
        const { error } = await response.json();
        if (error) {
          errorMessage = error;
        }
      } catch (parseError) {
        // ignore JSON parsing errors; keep default message
      }

      return {
        ok: false,
        error: errorMessage,
      };
    }

    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      error: "Message not sent, please try again later",
    };
  }
};
