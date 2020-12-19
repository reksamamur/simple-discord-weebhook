import React, { useState } from "react";
import "../App.css";
import Axios from "axios";

const Home: React.FC = () => {
  const [hookURL, setHookURL] = useState<string>("");
  const [hookMessage, setHookMessage] = useState("");

  const sendData = (e: any) => {
    e.preventDefault();

    if (hookURL !== "" && hookMessage !== "") {
      prepareForMessage(hookURL, hookMessage);
    } else {
      alert("sheeessss its empty man")
    }
  };

  const prepareForMessage = (url: string, message: string): void => {
    Axios.post(url, {
      content: message,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="container mx-auto">
      <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
        <div className="text-left">
          <h3 className="text-4xl tracking-tight font-extrabold text-gray-900">
            <span className="block xl:inline">Webhook</span>
            <span className="block text-indigo-600 xl:inline">Discord</span>
          </h3>
        </div>

        <div className="text-left">
          <div className="mt-5 block rounded-lg p-4 border border-gray-200">
            <h3 className="text-2xl tracking-tight">
              <span className="block xl:inline">Message section</span>
            </h3>
            <form className="relative mt-5">
              <label
                htmlFor="weebhook"
                className="text-lg tracking-tight font-medium text-black"
              >
                Webhook Discord URL
              </label>
              <div>
                <input
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                    setHookURL(ev.target.value)
                  }
                  name="weebhook"
                  type="text"
                  required
                  placeholder="Weebhook URL"
                  className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-3 pl-5"
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="message"
                  className="text-lg tracking-tight font-medium text-black"
                >
                  WeebHook Message
                </label>
                <textarea
                  onChange={(
                    ev: React.ChangeEvent<HTMLTextAreaElement>
                  ): void => setHookMessage(ev.target.value)}
                  name="message"
                  required
                  placeholder="Message here"
                  className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-3 pl-5"
                />
              </div>

              <div>
                <button
                  onClick={sendData}
                  className="flex items-center justify-center text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 py-2 px-8"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
