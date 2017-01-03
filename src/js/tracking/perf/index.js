function recordTime(component, event, attr, enable = true) {
  if (!enable) {
    return {
      done() {},
    };
  }
  const start = window.performance.now();
  return {
    done() {
      const total = window.performance.now() - start;
      console.log(`[perf] ${component}/${event} took ${Math.round(total)}ms`, attr || '');
    },
  };
}

export default {
  recordTime,
};
