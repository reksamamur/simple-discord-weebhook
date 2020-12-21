import React, { useState, useEffect } from "react";
import "../App.css";
import Axios from "axios";
import Discord from "discord.js";

import Profile from "../components/Profile";
import Validation from "../components/Validation";

const Home: React.FC = () => {
  const [hookURL, setHookURL] = useState<string>("");
  const [hookMessage, setHookMessage] = useState("");

  const [hookId, setHookId] = useState("");
  const [hookToken, setHookToken] = useState("");
  const [hookName, setHookName] = useState("");
  const [hookChannel, setHookChannel] = useState("");
  const [hookGuild, setHookGuild] = useState("");
  const [hookAvatar, setHookAvatar] = useState("");

  const [visible, setVisible] = useState("hidden");
  const [span, setSpan] = useState("col-span-2");

  const [visibleValidation, setVisibleValidation] = useState<string>("hidden");
  const [validation, setValidation] = useState<boolean>(false);
  const [textValidation, setTextValidation] = useState<string>("");
  const [colorValidation, setColorValidation] = useState<string>("");

  const webHookClient = new Discord.WebhookClient(hookId, hookToken);
  const client = new Discord.Client();

  useEffect(() => {
    fetchWebhook(hookURL);
  }, [hookURL]);

  async function fetchWebhook(url: string) {
    if (url !== "") {
      await Axios.get(url)
        .then((response) => {
          const data = response.data;
          getHook(
            data.id,
            data.token,
            data.name,
            data.channel_id,
            data.avatar,
            data.guild_id
          );
          setVisible("");
          setSpan("col-span-1");
          setVisibleValidation("")
          prepareValidation(true, "Valid", "text-green-500");
        })
        .catch((error) => {
          console.log(error.message);
          setVisible("hidden");
          setSpan("col-span-2");
          prepareValidation(false, "Invalid", "text-red-500");
        });
    } else {
      console.log("wait ok");
      setVisible("hidden");
      setSpan("col-span-2");
      setVisibleValidation("hidden");
    }
  }

  const getHook = (
    id: string,
    token: string,
    name: string,
    channel: string,
    avatar: string,
    guild: string
  ) => {
    setHookId(id);
    setHookToken(token);
    setHookName(name);
    setHookChannel(channel);
    setHookAvatar(avatar);
    setHookGuild(guild);
  };

  const sendData = (e: any) => {
    e.preventDefault();

    if (hookURL !== "" && hookMessage !== "") {
      prepareForMessage(hookURL, hookMessage);
    } else {
      alert("sheeessss its empty man");
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

  const prepareValidation = (valid: boolean, text: string, color: string) => {
    setValidation(valid);
    setTextValidation(text);
    setColorValidation(color);
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
          <div className="mt-5">
            <div className="grid grid-cols-2 gap-4">
              <div className={span}>
                <label
                  htmlFor="weebhook"
                  className="text-lg tracking-tight font-medium text-black"
                >
                  Webhook Discord URL
                </label>
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
                <div className={visibleValidation}>
                  <Validation
                    text={textValidation}
                    valid={validation}
                    color={colorValidation}
                  />
                </div>
              </div>
              <div className={visible}>
                <div className="block rounded-lg p-4 border border-gray-200">
                  <Profile hookName={hookName} hookChannelId={hookChannel} />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 block rounded-lg p-4 border border-gray-200">
            <form className="relative">
              <div>
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
