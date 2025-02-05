import { Coordinate } from './coordinate';
import Corner from './extent/Corner';
import Relationship from './extent/Relationship';
import { TransformFunction } from './proj';
import { Size } from './size';

export type Extent = number[];
export function applyTransform(extent: Extent, transformFn: TransformFunction, opt_extent?: Extent): Extent;
export function boundingExtent(coordinates: Coordinate[]): Extent;
export function buffer(extent: Extent, value: number, opt_extent?: Extent): Extent;
export function clone(extent: Extent, opt_extent?: Extent): Extent;
export function closestSquaredDistanceXY(extent: Extent, x: number, y: number): number;
export function containsCoordinate(extent: Extent, coordinate: Coordinate): boolean;
export function containsExtent(extent1: Extent, extent2: Extent): boolean;
export function containsXY(extent: Extent, x: number, y: number): boolean;
export function coordinateRelationship(extent: Extent, coordinate: Coordinate): Relationship;
export function createEmpty(): Extent;
export function createOrUpdate(minX: number, minY: number, maxX: number, maxY: number, opt_extent?: Extent): Extent;
export function createOrUpdateEmpty(opt_extent?: Extent): Extent;
export function createOrUpdateFromCoordinate(coordinate: Coordinate, opt_extent?: Extent): Extent;
export function createOrUpdateFromCoordinates(coordinates: Coordinate[], opt_extent?: Extent): Extent;
export function createOrUpdateFromFlatCoordinates(
    flatCoordinates: number[],
    offset: number,
    end: number,
    stride: number,
    opt_extent?: Extent,
): Extent;
export function createOrUpdateFromRings(rings: Coordinate[][], opt_extent?: Extent): Extent;
export function equals(extent1: Extent, extent2: Extent): boolean;
export function extend(extent1: Extent, extent2: Extent): Extent;
export function extendCoordinate(extent: Extent, coordinate: Coordinate): void;
export function extendCoordinates(extent: Extent, coordinates: Coordinate[]): Extent;
export function extendFlatCoordinates(
    extent: Extent,
    flatCoordinates: number[],
    offset: number,
    end: number,
    stride: number,
): Extent;
export function extendRings(extent: Extent, rings: Coordinate[][]): Extent;
export function extendXY(extent: Extent, x: number, y: number): void;
export function forEachCorner<S, T>(
    extent: Extent,
    callback: (this: T, p0: Coordinate) => S,
    opt_this?: T,
): S | boolean;
export function getArea(extent: Extent): number;
export function getBottomLeft(extent: Extent): Coordinate;
export function getBottomRight(extent: Extent): Coordinate;
export function getCenter(extent: Extent): Coordinate;
export function getCorner(extent: Extent, corner: Corner): Coordinate;
export function getEnlargedArea(extent1: Extent, extent2: Extent): number;
export function getForViewAndSize(
    center: Coordinate,
    resolution: number,
    rotation: number,
    size: Size,
    opt_extent?: Extent,
): Extent;
export function getHeight(extent: Extent): number;
export function getIntersection(extent1: Extent, extent2: Extent, opt_extent?: Extent): Extent;
export function getIntersectionArea(extent1: Extent, extent2: Extent): number;
export function getMargin(extent: Extent): number;
export function getSize(extent: Extent): Size;
export function getTopLeft(extent: Extent): Coordinate;
export function getTopRight(extent: Extent): Coordinate;
export function getWidth(extent: Extent): number;
export function intersects(extent1: Extent, extent2: Extent): boolean;
export function intersectsSegment(extent: Extent, start: Coordinate, end: Coordinate): boolean;
export function isEmpty(extent: Extent): boolean;
export function returnOrUpdate(extent: Extent, opt_extent?: Extent): Extent;
export function scaleFromCenter(extent: Extent, value: number): void;
