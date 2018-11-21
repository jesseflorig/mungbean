import  { Mungbean }  from "./mungbean"

const data = [{ id: 1, name: "foo" }, { id: 2, name: "bar" }]

const cfg = {
  input: data,
  outputPath: ""
}

Mungbean(cfg)
