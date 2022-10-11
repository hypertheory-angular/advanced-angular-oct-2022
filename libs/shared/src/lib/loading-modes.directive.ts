import {
  Directive,
  Input,
  OnChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AlertComponent } from '@ht/core-ui';

@Directive({
  selector: '[htSharedLoadingModes]',
})
export class LoadingModesDirective implements OnChanges {
  @Input('htSharedLoadingModes') modes: LoadingModes | null = null;

  @Input('htSharedLoadingModesLoading') loading: TemplateRef<unknown> | string =
    'Your Data Is Loading';
  @Input('htSharedLoadingModesErrored') errored: TemplateRef<unknown> | string =
    'Sorry There was an Error Loading Your Data';
  @Input('htSharedLoadingModesEmpty') empty: TemplateRef<unknown> | string =
    'There is no data';

  constructor(
    private viewContainerRef: ViewContainerRef,
    private template: TemplateRef<unknown>,
  ) {}
  ngOnChanges(): void {
    if (this.modes) {
      const mode = this.getMode(this.modes);
      this.viewContainerRef.clear();
      switch (mode) {
        case 'empty': {
          return this.displayMessage(this.empty, 'warning');
        }
        case 'loading': {
          return this.displayMessage(this.loading, 'info');
        }
        case 'errored': {
          return this.displayMessage(this.errored, 'error');
        }
        case 'ready': {
          this.viewContainerRef.createEmbeddedView(this.template);
        }
      }
    }
  }

  private displayMessage(
    comp: TemplateRef<unknown> | string,
    style: AlertStyles,
  ) {
    if (typeof comp !== 'string') {
      this.viewContainerRef.createEmbeddedView(comp);
      return;
    } else {
      const c = this.viewContainerRef.createComponent(AlertComponent);
      c.instance.alertStyle = style;
      c.instance.message = comp;
    }
  }

  getMode(x: LoadingModes): LoadingKeys {
    if (x.loading) return 'loading';
    if (x.errored) return 'errored';
    if (x.empty) return 'empty';
    return 'ready';
  }
}

type LoadingKeys = keyof LoadingModes | 'ready';
export type LoadingModes = {
  loading: boolean;
  errored: boolean;
  empty: boolean;
};

type AlertStyles = 'info' | 'warning' | 'success' | 'error';
