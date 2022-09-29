import { cpu, drive, mem, os, netstat } from "node-os-utils";

export default async function handler(req, res) {
  res.status(200).json([
    {
      cpu: {
        usage: await cpu.usage(1000),
        load: cpu.loadavgTime(5).toFixed(2),
        model: cpu.model(),
        cpus: cpu.count(),
      },
    },
    {
      drive: await drive.info("/"),
    },
    {
      memory: await mem.info(),
    },
    {
      OS: {
        type: await os.oos(),
        ip: await os.ip(),
        hostName: await os.hostname(),
      },
    },
  ]);
}
