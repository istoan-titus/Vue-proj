import type StarWarsPeople from "@/components/PeopleList/StarWarsPeople";
import type StarWarsPlanet from "@/components/Planets/StarWarsPlanet";
import type StarWarsVehicle from "@/components/Vehicles/StarWarsVehicle";
import HttpService from "../http-common";

interface AllPeopleResponse {
  count: number;
  results: StarWarsPeople[];
  next: string;
  previous: string;
}

interface AllPlanetsResponse {
  count: number;
  results: StarWarsPlanet[];
  next: string;
  previous: string;
}

interface AllVehiclesResponse {
  count: number;
  results: StarWarsVehicle[];
  next: string;
  previous: string;
}

export const getAllPeople = async (): Promise<AllPeopleResponse> => {
  try {
    return await HttpService.get("people");
  } catch (e) {
    console.log("people not found");
    return Promise.reject();
  }
};

export const getAllPlanets = async (): Promise<AllPlanetsResponse> => {
  try {
    return await HttpService.get("planets");
  } catch (e) {
    console.log("people not found");
    return Promise.reject();
  }
};

export const getAllVehicles = async (): Promise<AllVehiclesResponse> => {
  try {
    return await HttpService.get("vehicles");
  } catch (e) {
    console.log("people not found");
    return Promise.reject();
  }
};
