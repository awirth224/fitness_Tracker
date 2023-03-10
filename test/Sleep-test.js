const { expect } = require("chai");
const Sleep = require("../src/Sleep");

describe("Sleep", () => {
  let sleepEntry1;
  let sleepEntry2;
  let sleepEntry3;
  let sleepEntry4;
  let sleepEntry5;
  let sleepEntry6;
  let sleepEntry7;
  let sleepEntry8;
  let data;
  let sleep1;

  beforeEach(() => {
    sleepEntry1 = {
      userID: 1,
      date: "2019/06/15",
      hoursSlept: 6.1,
      sleepQuality: 2.2
    };

    sleepEntry2 = {
      userID: 2,
      date: "2019/06/15",
      hoursSlept: 7,
      sleepQuality: 4.7
    };

    sleepEntry3 = {
      userID: 1,
      date: "2019/06/16",
      hoursSlept: 4.1,
      sleepQuality: 3.8
    };

    sleepEntry4 = {
      userID: 1,
      date: "2019/06/17",
      hoursSlept: 8,
      sleepQuality: 2.6
    };

    sleepEntry5 = {
      userID: 1,
      date: "2019/06/18",
      hoursSlept: 10.4,
      sleepQuality: 3.1
    };

    sleepEntry6 = {
      userID: 1,
      date: "2019/06/19",
      hoursSlept: 10.7,
      sleepQuality: 1.2
    };

    sleepEntry7 = {
      userID: 1,
      date: "2019/06/20",
      hoursSlept: 8,
      sleepQuality: 3.4
    };

    sleepEntry8 = {
      userID: 1,
      date: "2019/06/21",
      hoursSlept: 10.1,
      sleepQuality: 1.8
    };
    
    data = [
      sleepEntry1, 
      sleepEntry2, 
      sleepEntry3, 
      sleepEntry4, 
      sleepEntry5, 
      sleepEntry6, 
      sleepEntry7, 
      sleepEntry8
    ];

    sleep1 = new Sleep(1, data)
  });

  it('should be a function', () => {
    expect(Sleep).to.be.a("function")
  });

  it("should be an instance of sleep", () => {
    expect(sleep1).to.be.an.instanceOf(Sleep)
  });

  it("should have a user id", () => {
    expect(sleep1.id).to.equal(1)
  });

  it("should have sleep data for all users", () => {
    expect(sleep1.allData).to.deep.equal(data)
  });

  it("should have a method that filters the sleep data by user id", () => {
    expect(sleep1.sleepHistory).to.deep.equal([sleepEntry1, sleepEntry3, sleepEntry4, sleepEntry5, sleepEntry6, sleepEntry7, sleepEntry8])
  });

  it('should have a method that returns the average hours slept per day', () => {
    expect(sleep1.calcDailyHrsAvg()).to.equal(8.2)
  });

  it('should have a method that returns the average sleep quality per day', () => {
    expect(sleep1.calcDailyQualityAvg()).to.equal(2.6)
  });

  it('should have a method that returns either specified measurement for a single date', () => {
    expect(sleep1.giveDaily("2019/06/14", "hoursSlept")).to.be.undefined
    expect(sleep1.giveDaily("2019/06/14", "sleepQuality")).to.be.undefined
    expect(sleep1.giveDaily("2019/06/15", "sleepQuality")).to.equal(2.2)
    expect(sleep1.giveDaily("2019/06/15", "hoursSlept")).to.equal(6.1)
  });


  it('should have a method that returns the specified measurement each day over the course of a week', () => {
    expect(sleep1.totalWeekly("2019/06/14", "hoursSlept")).to.be.an('array')
    expect(sleep1.totalWeekly("2019/06/14", "sleepQuality")).to.be.an('array')
    expect(sleep1.totalWeekly("2019/06/21", "hoursSlept")).to.deep.equal([ 6.1, 4.1, 8, 10.4, 10.7, 8, 10.1 ])
    expect(sleep1.totalWeekly("2019/06/21", "sleepQuality")).to.deep.equal([ 2.2, 3.8, 2.6, 3.1, 1.2, 3.4, 1.8 ])
  });

  it('should have a method that returns the average sleep quality across all users', () => {
    expect(sleep1.averageAllUsersQuality()).to.equal(2.8)
  });
})