type ModuleExecCallback<T, K extends keyof T> = (modules: ModuleInterface<T, K>) => void;

interface Module<T, K extends keyof TrackedModules<T>> {
  name: K;
  exec: ModuleExecCallback<T, K>;
  interface: ModuleInterface<T, K>;
}

interface ModuleParam<R, E> {
  require: R,
  export: E;
}

type TrackedModules<T> = {
  [K in keyof T]: Module<T, K>;
}

class ModuleInterface<T, N extends keyof T> {
  private tracker: ModuleTracker<Omit<T, N>>;

  name: N;
  exports: T[N];

  constructor(name: N, tracker: ModuleTracker<unknown>) {
    this.name = name;
    this.tracker = tracker as ModuleTracker<Omit<T, N>>;
    this.exports = {} as T[N];
  }

  import<K extends keyof Omit<T, N>>(moduleName: K): T[K] {
    return this.tracker.import(moduleName);
  }
}

class ModuleTracker<T = any> {
  modules: TrackedModules<T>;

  constructor() {
    this.modules = {} as TrackedModules<T>;
  }

  track<K extends keyof T>(moduleName: K, callback: ModuleExecCallback<T, K>) {
    this.modules[moduleName] = {
      exec: callback,
      interface: new ModuleInterface(moduleName, this),
      name: moduleName
    };
  }

  import<K extends keyof T>(moduleName: K): T[K] {
    this.run(moduleName);

    return this.modules[moduleName].interface.exports;
  }

  run<K extends keyof T>(moduleName: K) {
    const module = this.modules[moduleName];
    const { exec } = module;

    exec(module.interface);

    return module.interface.exports;
  }
}

interface Modules {
  pack: { data: string };
  main: void;
}

const tracker = new ModuleTracker<Modules>();

tracker.track('pack', function(tracker) {
  tracker.exports.data = 'oi';
});

tracker.track('main', function(tracker) {
  const { data } = tracker.import('pack');

  tracker.import('pack');

  console.log(data);
});

tracker.run('main');