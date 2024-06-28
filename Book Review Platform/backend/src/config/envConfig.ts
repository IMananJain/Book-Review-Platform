import env from "../../env.json";

interface IEnvConfig {
  host: string;
  port: number;
  mongodb_url: string;
  secretKey: string;
}

const envConfig = (): IEnvConfig => {
  const nodeEnv = (process.env.NODE_ENV as keyof typeof env) || "local";
  return env[nodeEnv];
};

export default envConfig;