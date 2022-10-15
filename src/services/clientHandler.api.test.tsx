import {Client} from "../models/client"

import request from 'supertest';
import {app} from "../../server/app";
import React from "react";

export const setHookTestState = (newState: any) => {
    const setStateMockFn = () => {};
    return Object.keys(newState).reduce((acc, val) => {
        acc = acc?.mockImplementationOnce(() => [newState[val], setStateMockFn]);
        return acc;
    }, jest.fn());
};

const mockSetState = jest.fn();
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: (initial: any) => [initial, mockSetState]
}));

describe('clients endpoint', () => {
    test('should return appropriate message', function(done) {
        let client = {"hostname": "ciccio", "ip": "192.168.10.2"} as Client;

        request(app)
            .post('/clients')
            .send(client)
            .expect(200)
            .end(function(err, response) {
            if (err) return done(err);
                expect(response.body.message).toContain("Registered")
                expect(response.body.message).toContain("pippo")
                expect(response.body.message).toContain("192.168.10.1")

                return done();
            })
    })
})