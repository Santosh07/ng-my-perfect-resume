import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoutesService {
  route: ActivatedRoute | null = null;
  router: Router | null = null;

  currentIndex = new Subject<any>();

  constructor() {}

  updateRoutes(route: ActivatedRoute, router: Router) {
    this.route = route;
    this.router = router;
  }

  updateCurrentIndex(currentRoute: string) {
    console.log('Updating index to: ', currentRoute);
    this.currentIndex.next(
      this.routes.findIndex((route) => route.link === currentRoute)
    );
  }

  /**
   * label: Label that is displayed in step
   * link: Page link for that label
   * subRoutes: list of sub routes that the page can have.
   *  For example. Skills page can have multiple step in it.
   */
  routes = [
    {
      label: 'Heading',
      link: 'heading',
      subRoutes: [
        {
          link: 'intro',
        },
        {
          link: 'form',
        },
      ],
    },
    {
      label: 'Work Experience',
      link: 'work-experience',
      subRoutes: [
        {
          link: 'form',
        },
      ],
    },
    {
      label: 'Education',
      link: 'education',
      subRoutes: [
        {
          link: 'form',
        },
      ],
    },
    {
      label: 'Skills',
      link: 'skills',
      subRoutes: [
        {
          link: 'intro',
        },
        {
          link: 'add-skills',
        },
      ],
    },
    {
      label: 'Summary',
      link: 'summary',
      subRoutes: [
        {
          link: 'home',
        },
        {
          link: 'add-summary',
        },
      ],
    },
    {
      label: 'Review Resume',
      link: 'review-resume',
    },
  ];

  getIndex(currentRoute: string) {
    return this.routes.findIndex((route) => route.link === currentRoute);
  }

  goToPreviousRoute() {
    console.log('==', this.route?.parent?.snapshot);
    let prevRoute = null;
    if (this.route?.parent?.snapshot.routeConfig?.path) {
      prevRoute = this.getBackRoute(
        this.route.parent?.snapshot.routeConfig?.path ?? '',
        this.route.snapshot.routeConfig?.path ?? ''
      );
    } else {
      prevRoute = this.getBackRoute(
        this.route?.snapshot.routeConfig?.path ?? '',
        ''
      );
    }
    console.log('==', prevRoute);
    this.updateCurrentIndex(prevRoute?.split('/')[0] ?? '');

    this.router?.navigate([prevRoute]);
  }

  goToNextRoute() {
    console.log('==', this.route?.parent?.snapshot);
    let nextRoute = null;
    if (this.route?.parent?.snapshot.routeConfig?.path) {
      nextRoute = this.getNextRoute(
        this.route.parent?.snapshot.routeConfig?.path ?? '',
        this.route.snapshot.routeConfig?.path ?? ''
      );
    } else {
      nextRoute = this.getNextRoute(
        this.route?.snapshot.routeConfig?.path ?? '',
        ''
      );
    }

    this.updateCurrentIndex(nextRoute?.split('/')[0] ?? '');

    this.router?.navigate([nextRoute]);
  }

  /**
   *
   * @param label Label of the step
   * @param currentPage Link of surrent page without "/"
   * @returns True if index of label is less than index of currentPage
   *
   * Example;
   * If current page is skills, returns true for all previous
   * pages Heading, Work Experience, Education and Skills
   *
   */
  isStepActive(label: string, currentPage: string) {
    // console.log(label, ' - ', currentPage);
    const currentPageIndex = this.routes.findIndex(
      (route) => route.link === currentPage
    );
    const stepIndex = this.routes.findIndex((route) => route.label === label);

    // console.log('result', stepIndex <= currentPageIndex);
    return stepIndex < currentPageIndex;
  }

  /**
   *
   * @param routeStr Main route
   * @param subRouteStr Sub route
   * @returns The next route from the routes array
   *
   * Example:
   * heading =>  /work-experience
   * work-experience =>  /education
   * education =>  /skills/route1
   * skills, route1 =>  /skills/route2
   * skills, route2 =>  /summary/route1
   * summary, route1 => /summary/route2
   * summary, route2 => null
   */
  getNextRoute(routeStr: string, subRouteStr?: string) {
    const routeObj = this.routes.find((route) => route.link === routeStr);
    const routeIndex = this.routes.findIndex(
      (route) => route.link === routeStr
    );

    if (subRouteStr && routeObj?.subRoutes) {
      const subRouteIndex = routeObj.subRoutes.findIndex(
        (subRoute) => subRoute.link === subRouteStr
      );
      if (subRouteIndex === routeObj.subRoutes.length - 1) {
        //Last sub route
        if (routeIndex === this.routes.length - 1) {
          //Last route
          return null;
        } else {
          const nextRouteObj = this.routes[routeIndex + 1];
          if (nextRouteObj.subRoutes) {
            return (
              '/' +
              [nextRouteObj.link, nextRouteObj.subRoutes[0].link].join('/')
            );
          } else {
            return `/${nextRouteObj.link}`;
          }
        }
      } else {
        return (
          '/' +
          [routeObj.link, routeObj.subRoutes[subRouteIndex + 1].link].join('/')
        );
      }
    } else {
      if (routeIndex === this.routes.length - 1) {
        //Last route
        return null;
      } else {
        const nextRouteObj = this.routes[routeIndex + 1];
        if (nextRouteObj.subRoutes) {
          return (
            '/' + [nextRouteObj.link, nextRouteObj.subRoutes[0].link].join('/')
          );
        } else {
          return `/${nextRouteObj.link}`;
        }
      }
    }
  }

  getBackRoute(routeStr: string, subRouteStr?: string) {
    const routeObj = this.routes.find((route) => route.link === routeStr);
    const routeIndex = this.routes.findIndex(
      (route) => route.link === routeStr
    );

    if (subRouteStr && routeObj?.subRoutes) {
      const subRouteIndex = routeObj.subRoutes.findIndex(
        (subRoute) => subRoute.link === subRouteStr
      );
      if (subRouteIndex === 0) {
        //First sub route
        if (routeIndex === this.routes.length - 1) {
          //First route
          return null;
        } else {
          const nextRouteObj = this.routes[routeIndex - 1];
          if (nextRouteObj.subRoutes) {
            const subRoutesCount = nextRouteObj.subRoutes.length;
            return (
              '/' +
              [
                nextRouteObj.link,
                nextRouteObj.subRoutes[subRoutesCount - 1].link,
              ].join('/')
            );
          } else {
            return `/${nextRouteObj.link}`;
          }
        }
      } else {
        return (
          '/' +
          [routeObj.link, routeObj.subRoutes[subRouteIndex - 1].link].join('/')
        );
      }
    } else {
      if (routeIndex === 0) {
        //First route
        return null;
      } else {
        const nextRouteObj = this.routes[routeIndex - 1];
        if (nextRouteObj.subRoutes) {
          const subRoutesCount = nextRouteObj.subRoutes.length;
          return (
            '/' +
            [
              nextRouteObj.link,
              nextRouteObj.subRoutes[subRoutesCount - 1].link,
            ].join('/')
          );
        } else {
          return `/${nextRouteObj.link}`;
        }
      }
    }
  }
}
