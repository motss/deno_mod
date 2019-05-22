interface MockData {
  items: number[];
  status?: 'complete' | 'in-progress';
}

import {
  assertStrictEq,
  assertEquals,
  assertThrowsAsync,
  prepareTest,
} from "../test.mod.ts";
import { PollingObserver, OnfinishRejected, OnfinishFulfilled } from "./mod.ts";
import { PollingMeasure } from "./polling_measure.ts";

async function failsWhenConditionCallbackIsUndefined() {
  await assertThrowsAsync(
    async () => new PollingObserver(undefined) as unknown as void,
    TypeError,
    `'conditionCallback' is not defined`
  );
}

async function failsWhenErrorOccurs() {
  const obs = new PollingObserver<MockData>(() => false);
  const task = new Promise<OnfinishRejected>((yay) => {
    obs.onfinish = (d: OnfinishRejected) => yay(d);
  });

  obs.observe(
    async () => {
      throw new Error('polling error');
    },
    { interval: 1e3 });

  const { status, reason } = await task;

  assertStrictEq(status, "error");
  assertStrictEq(reason instanceof Error, true);
  assertStrictEq(reason.message, "polling error");
}

async function willFinishPollingWithConditionFulfills() {
  const data: MockData = { items: [Math.floor(Math.random() * Math.PI)] };
  const obs = new PollingObserver<MockData>((d: MockData) => Boolean(d && d.items.length > 0));
  const task = new Promise<OnfinishFulfilled<MockData>>((yay) => {
    obs.onfinish = (d: OnfinishFulfilled<MockData>) => yay(d);
  });

  obs.observe(
    async () => {
      return new Promise<MockData>(yay => setTimeout(() => yay(data), 2e3));
    },
    { interval: 1e3, timeout: 5e3 });

  const { status, value } = await task;

  assertStrictEq(status, "finish");
  assertEquals(value, { ...data });
}

async function willTimeoutAPolling() {
  const data: MockData = { items: [Math.floor(Math.random() * Math.PI)] };
  const obs = new PollingObserver<MockData>(() => false);
  const task = new Promise<OnfinishFulfilled<MockData>>((yay) => {
    obs.onfinish = (d: OnfinishFulfilled<MockData>) => yay(d);
  });

  obs.observe(
    async () => {
      return new Promise<MockData>(yay => setTimeout(() => yay(data), 7e3));
    },
    { interval: 1e3, timeout: 5e3 });

  const { status, value } = await task;

  assertStrictEq(status, "timeout");
  assertEquals(value, { ...data });
}

async function willTimeoutAPollingWithMoreThanOneRepeat() {
  const data: MockData = { items: [Math.floor(Math.random() * Math.PI)] };
  const obs = new PollingObserver<MockData>(() => false);
  const task = new Promise<OnfinishFulfilled<MockData>>((yay) => {
    obs.onfinish = (d: OnfinishFulfilled<MockData>) => yay(d);
  });

  obs.observe(
    async () => {
      /**
       * NOTE(motss): The promise resolves after 1s timeout and the next run will be
       * scheduled to happen in roughly (1e3 - 1) milliseconds.
       */
      return new Promise<MockData>(yay => setTimeout(() => yay(data), 1));
    },
    { interval: 1e3, timeout: 5e3 });

  const { status, value } = await task;

  assertStrictEq(status, "timeout");
  assertEquals(value, { ...data });
}

async function willReadRecordsWhenPollingFinishes() {
  const data: MockData = { items: [Math.floor(Math.random() * Math.PI)] };
  const obs = new PollingObserver<MockData>(() => false);
  const task = new Promise<[OnfinishFulfilled<MockData>, PollingMeasure[]]>((yay) => {
    obs.onfinish = (d: OnfinishFulfilled<MockData>, r: PollingMeasure[]) => yay([d, r]);
  });

  obs.observe(
    async () => {
      return new Promise<MockData>(yay => setTimeout(() => yay(data), 1));
    },
    { interval: 1e3, timeout: 5e3 });

  const [{ status, value }, records] = await task;

  assertStrictEq(status, "timeout");
  assertEquals(value, { ...data });

  assertStrictEq(records.length > 1, true);

  const firstRecord = records[0].toJSON();
  assertStrictEq("number" === typeof(firstRecord.duration) && !Number.isNaN(firstRecord.duration), true);
  assertStrictEq("string" === typeof(firstRecord.entryType) && "polling-measure" === firstRecord.entryType, true);
  assertStrictEq("string" === typeof(firstRecord.name) && /^polling:\d+/gi.test(firstRecord.name), true);
  assertStrictEq("number" === typeof(firstRecord.startTime) && !Number.isNaN(firstRecord.startTime), true);

  assertStrictEq(obs.takeRecords().length > 1, true);

  const firstRecordTaken = obs.takeRecords()[0].toJSON();
  assertStrictEq("number" === typeof(firstRecordTaken.duration) && !Number.isNaN(firstRecordTaken.duration), true);
  assertStrictEq("string" === typeof(firstRecordTaken.entryType) && "polling-measure" === firstRecordTaken.entryType, true);
  assertStrictEq("string" === typeof(firstRecordTaken.name) && /^polling:\d+/gi.test(firstRecordTaken.name), true);
  assertStrictEq("number" === typeof(firstRecordTaken.startTime) && !Number.isNaN(firstRecordTaken.startTime), true);
}

async function willClearRecordsWhenObserverDisconnects() {
  const data: MockData = { items: [Math.floor(Math.random() * Math.PI)] };
  const obs = new PollingObserver<MockData>(() => false);
  const task = new Promise<[OnfinishFulfilled<MockData>, PollingMeasure[]]>((yay) => {
    obs.onfinish = (d: OnfinishFulfilled<MockData>, r: PollingMeasure[]) => yay([d, r]);
  });

  obs.observe(
    async () => {
      return new Promise<MockData>(yay => setTimeout(() => yay(data), 1));
    },
    { interval: 1e3, timeout: 5e3 });

  const [{ status, value }, records] = await task;

  assertStrictEq(status, "timeout");
  assertEquals(value, { ...data });
  assertStrictEq(records.length > 1, true);
  assertStrictEq(obs.takeRecords().length > 1, true);

  obs.disconnect();

  assertStrictEq(obs.takeRecords().length < 1, true);
}

async function willForcePollingToStopByDisconnecting() {
  const data: MockData = { items: [Math.floor(Math.random() * Math.PI)] };
  const obs = new PollingObserver<MockData>(() => {
    /**
     * NOTE(motss): Disconnect observer after 1st polling.
     */
    obs.disconnect();
    return false;
  });
  const task = new Promise<[OnfinishFulfilled<MockData>, PollingMeasure[]]>((yay) => {
    obs.onfinish = (d: OnfinishFulfilled<MockData>, r: PollingMeasure[]) => yay([d, r]);
  });

  obs.observe(
    async () => {
      return new Promise<MockData>(yay => setTimeout(() => yay(data), 1));
    },
    { interval: 2e3, timeout: 5e3 });

  const [{ status, value }, records] = await task;

  assertStrictEq(status, "finish");
  assertEquals(value, { ...data });
  assertStrictEq(records.length === 1, true);
  assertStrictEq(!obs.takeRecords().length, true);
}

async function willDisconnectBeforeFirstPollingInitiates() {
  const data: MockData = { items: [Math.floor(Math.random() * Math.PI)] };
  const obs = new PollingObserver<MockData>(() => false);
  const task = new Promise<[OnfinishFulfilled<MockData>, PollingMeasure[]]>((yay) => {
    obs.onfinish = (d: OnfinishFulfilled<MockData>, r: PollingMeasure[]) => yay([d, r]);
  });

  obs.observe(
    async () => {
      console.log('2');
      return new Promise<MockData>(yay => setTimeout(() => yay(data), 1));
    },
    { interval: 2e3, timeout: 5e3 });
  obs.disconnect();

  const [{ status, value }, records] = await task;

  assertStrictEq(status, "finish");
  assertEquals(value, { ...data });
  assertStrictEq(records.length > 0, true);
  assertStrictEq(!obs.takeRecords().length, true);
}

async function willReobserveAfterDisconnected() {
  const getMockData = (): MockData => ({ items: [Math.floor(Math.random() * Math.PI)] });
  const pollingFn = (d: MockData) => async () => {
    return new Promise<MockData>(yay => setTimeout(() => yay(d), 1));
  };

  const obs = new PollingObserver<MockData>(() => false);
  const pollingOpts = { interval: 1e3, timeout: 3e3 };

  const mockData = getMockData();
  const task = new Promise<[OnfinishFulfilled<MockData>, PollingMeasure[]]>((yay) => {
    obs.onfinish = (d: OnfinishFulfilled<MockData>, r: PollingMeasure[]) => yay([d, r]);
  });

  obs.observe(pollingFn(mockData), pollingOpts);

  const [{ status, value }, records] = await task;

  assertStrictEq(status, "timeout");
  assertEquals(value, { ...mockData });
  assertStrictEq(records.length > 1, true);
  assertStrictEq(obs.takeRecords().length > 1, true);

  obs.disconnect();
  assertStrictEq(obs.takeRecords().length < 1, true);

  {
    const mockData2 = getMockData();
    const task2 = new Promise<[OnfinishFulfilled<MockData>, PollingMeasure[]]>((yay) => {
      obs.onfinish = (d: OnfinishFulfilled<MockData>, r: PollingMeasure[]) => yay([d, r]);
    });

    obs.observe(pollingFn(mockData2), pollingOpts);

    const [{ status, value }, records] = await task2;

    assertStrictEq(status, "timeout");
    assertEquals(value, { ...mockData2 });
    assertStrictEq(records.length > 1, true);
    assertStrictEq(obs.takeRecords().length > 1, true);
  }
}

async function willPollWithOptionalInterval() {
  const data: MockData = { items: [Math.floor(Math.random() * Math.PI)] };
  const obs = new PollingObserver<MockData>(() => false);
  const task = new Promise<OnfinishFulfilled<MockData>>((yay) => {
    obs.onfinish = (d: OnfinishFulfilled<MockData>) => yay(d);
  });

  obs.observe(
    async () => {
      return new Promise<MockData>(yay => setTimeout(() => yay(data), 1));
    },
    { timeout: 5e3 });

  const { status, value } = await task;

  assertStrictEq(status, "timeout");
  assertEquals(value, { ...data });
  assertStrictEq(obs.takeRecords().length > 1, true);
}

async function willPollWithOptionalTimeout() {
  const data: MockData = { items: [Math.floor(Math.random() * Math.PI)] };
  const startsAt = +new Date();
  const obs = new PollingObserver<MockData>(() => {
    /** NOTE(motss): It still needs to be stopped to pass the test */
    const endsAt = +new Date();
    return Math.floor(endsAt - startsAt) > 5e3;
  });
  const task = new Promise<[OnfinishFulfilled<MockData>, PollingMeasure[]]>((yay) => {
    obs.onfinish = (d: OnfinishFulfilled<MockData>, r: PollingMeasure[]) => yay([d, r]);
  });

  obs.observe(
    async () => {
      return new Promise<MockData>(yay => setTimeout(() => yay(data), 1));
    },
    { interval: 2e3 });

  const [{ status, value }, records] = await task;

  assertStrictEq(status, "finish");
  assertEquals(value, { ...data });
  assertStrictEq(records.length > 1, true);
  assertStrictEq(obs.takeRecords().length > 1, true);
}

async function willPollWithOptionalOptions() {
  const data: MockData = { items: [Math.floor(Math.random() * Math.PI)] };
  const startsAt = +new Date();
  const obs = new PollingObserver<MockData>(() => {
    /** NOTE(motss): It still needs to be stopped to pass the test */
    const endsAt = +new Date();
    return Math.floor(endsAt - startsAt) > 5e3;
  });
  const task = new Promise<[OnfinishFulfilled<MockData>, PollingMeasure[]]>((yay) => {
    obs.onfinish = (d: OnfinishFulfilled<MockData>, r: PollingMeasure[]) => yay([d, r]);
  });

  obs.observe(
    async () => {
      return new Promise<MockData>(yay => setTimeout(() => yay(data), 1));
    });

  const [{ status, value }, records] = await task;

  assertStrictEq(status, "finish");
  assertEquals(value, { ...data });
  assertStrictEq(records.length > 1, true);
  assertStrictEq(obs.takeRecords().length > 1, true);
}

async function willPollWithAsyncConditionCallback() {
  const data: MockData = { items: [Math.floor(Math.random() * Math.PI)] };
  const obs = new PollingObserver<MockData>(async () => false);
  const task = new Promise<[OnfinishFulfilled<MockData>, PollingMeasure[]]>((yay) => {
    obs.onfinish = (d: OnfinishFulfilled<MockData>, r: PollingMeasure[]) => yay([d, r]);
  });

  obs.observe(
    async () => {
      return new Promise<MockData>(yay => setTimeout(() => yay(data), 1));
    },
    { interval: 2e3, timeout: 5e3 });

  const [{ status, value }, records] = await task;

  assertStrictEq(status, "timeout");
  assertEquals(value, { ...data });
  assertStrictEq(records.length > 1, true);
  assertStrictEq(obs.takeRecords().length > 1, true);
}

async function willPollWithSyncCallback() {
  const data: MockData = { items: [Math.floor(Math.random() * Math.PI)] };
  const obs = new PollingObserver<MockData>(async () => false);
  const task = new Promise<[OnfinishFulfilled<MockData>, PollingMeasure[]]>((yay) => {
    obs.onfinish = (d: OnfinishFulfilled<MockData>, r: PollingMeasure[]) => yay([d, r]);
  });

  obs.observe(() => data, { interval: 2e3, timeout: 5e3 });

  const [{ status, value }, records] = await task;

  assertStrictEq(status, "timeout");
  assertEquals(value, { ...data });
  assertStrictEq(records.length > 1, true);
  assertStrictEq(obs.takeRecords().length > 1, true);
}

async function willPollWithoutOnfinishCallback() {
  const data: MockData = { items: [Math.floor(Math.random() * Math.PI)] };
  const obs = new PollingObserver<MockData>(async () => false);
  const task = new Promise<PollingMeasure[]>(yay => setTimeout(() => {
    yay(obs.takeRecords());
  }, 8e3));

  obs.observe(() => data, { interval: 2e3, timeout: 5e3 });

  assertEquals(obs.takeRecords().length < 1, true);
  assertEquals((await task).length > 1, true);
}

async function willFireFinishEvent() {
  const data: MockData = { items: [Math.floor(Math.random() * Math.PI)] };
  const obs = new PollingObserver<MockData>(async () => false);
  const task = new Promise<CustomEvent>((yay) => {
    obs.addEventListener(
      'finish',
      // (ev: CustomEvent<[OnfinishFulfilled<MockData>, PollingMeasure[]]>) => yay(ev.detail)
      (ev: CustomEvent) => yay(ev)
    );
  });

  obs.observe(() => data, { interval: 2e3, timeout: 5e3 });

  const {
    detail: [
      { status, value },
      records,
    ],
    // [OnfinishFulfilled<MockData>, PollingMeasure[]]
  } = await task;


  assertStrictEq(status, "timeout");
  assertEquals(value, { ...data });
  assertStrictEq(records.length > 1, true);
  assertStrictEq(obs.takeRecords().length > 1, true);
}

prepareTest([
  failsWhenConditionCallbackIsUndefined,
  failsWhenErrorOccurs,

  willFinishPollingWithConditionFulfills,
  willTimeoutAPolling,
  willTimeoutAPollingWithMoreThanOneRepeat,
  willReadRecordsWhenPollingFinishes,
  willClearRecordsWhenObserverDisconnects,
  willForcePollingToStopByDisconnecting,
  willDisconnectBeforeFirstPollingInitiates,
  willReobserveAfterDisconnected,
  willPollWithOptionalInterval,
  willPollWithOptionalTimeout,
  willPollWithOptionalOptions,
  willPollWithAsyncConditionCallback,
  willPollWithSyncCallback,
  willPollWithoutOnfinishCallback,
  willFireFinishEvent,
], "polling_observer");
