import { cpu, drive, mem, os, net } from "node-os-utils";
import * as si from "systeminformation";

export default async function handler(req, res) {
  if (req.query.get === "cpu") {
    si.cpuTemperature()
      .then(async (data) => {
        await res.status(200).json({
          name: "CPU",
          usage: cpu.usage(1000),
          load: cpu.loadavgTime(5).toFixed(2),
          model: cpu.model(),
          cpus: cpu.count(),
          temp: data,
        });
      })
      .catch((err) => res.send(err));
  } else if (req.query.get === "memory") {
    res.json({
      name: "Memory",
      memory: await mem.info(),
    });
  } else if (req.query.get === "drive") {
    res.json({
      name: "Drive",
      drive: drive.info(),
    });
  } else if (req.query.get === "os") {
    res.json({
      name: "OS",
      type: os.oos(),
      ip: os.ip(),
      hostName: os.hostname(),
    });
  } else {
    si.cpuTemperature()
      .then(async (data) => {
        await res.status(200).send([
          {
            name: "CPU",
            usage: cpu.usage(1000),
            load: cpu.loadavgTime(5).toFixed(2),
            model: cpu.model(),
            cpus: cpu.count(),
            temp: data,
          },
          {
            name: "Memory",
            memory: await mem.info(),
          },
          {
            drive: await drive.info(),
          },
          {
            name: "OS",
            type: os.oos(),
            ip: os.ip(),
            hostName: os.hostname(),
          },
        ]);
      })
      .catch((err) => console.log(err));
  }
}
