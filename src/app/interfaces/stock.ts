export interface Stock {
  symbol: string;
  bid: string;
  mid: string;
  ask: string;
}
// Interface structure decided based on the Streaming API docs for what data is received when price event occurs
